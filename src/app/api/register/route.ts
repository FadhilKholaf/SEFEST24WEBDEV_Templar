import { encrypt } from '@/utils/encryption';
import { createUser, findUser } from '@/utils/database/user.query';
import { Prisma } from '@prisma/client';
import {
  createOrganization,
  findOrganization
} from '@/utils/database/organization.query';

export async function POST(req: Request) {
  try {
    const {
      isOrganization,
      email,
      password,
      nama
    }: {
      isOrganization: boolean | undefined;
      email: string;
      password: string;
      nama: string;
    } = await req.json();

    if (!email || !password || !nama) {
      return Response.json(
        { status: 403, message: 'Semua kredensial harus diisi' },
        {
          status: 403
        }
      );
    }

    const checkUser = isOrganization
      ? await findOrganization({ email })
      : await findUser({ email });
    if (checkUser)
      return Response.json(
        { status: 403, message: 'Email sudah terdaftar' },
        {
          status: 403
        }
      );

    if (!isOrganization) {
      await createUser({
        email,
        password,
        name: nama
      });

      return Response.json({ status: 201, message: 'Sukses' }, { status: 201 });
    }

    await createOrganization({
      email,
      name: nama,
      password
    });

    return Response.json({ status: 201, message: 'Sukses' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({
      status: 500,
      message: 'internal server error'
    });
  }
}
