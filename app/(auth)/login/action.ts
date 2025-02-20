'use server';

import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const checkAdminIdExists = async (admin_id: string) => {
  const admin = await db.admin.findUnique({
    where: {
      admin_id,
    },
    select: {
      id: true,
    },
  });
  return Boolean(admin);
};

const formSchema = z.object({
  admin_id: z
    .string()
    .min(1, { message: '아이디를 입력해주세요.' })
    .superRefine(async (data, ctx) => {
      const exists = await checkAdminIdExists(data);
      if (!exists) {
        ctx.addIssue({
          path: ['admin_id'],
          message: '아이디가 존재하지 않습니다.',
          code: z.ZodIssueCode.custom,
        });
      }
    }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    admin_id: formData.get('admin_id')?.toString() ?? '',
    password: formData.get('password')?.toString() ?? '',
  };
  const result = await formSchema.spa(data);
  const admin = await db.admin.findUnique({
    where: {
      admin_id: result.data?.admin_id,
    },
    select: {
      admin_id: true,
      password: true,
    },
  });
  const ok = result.data?.password === admin?.password;
  if (ok) {
    redirect('/upload');
  } else {
    return {
      fieldErrors: {
        password: ['비밀번호를 다시 확인해주세요.'],
        admin_id: [],
      },
    };
  }
}
