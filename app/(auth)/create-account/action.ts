'use server';
import db from '@/lib/db';
import { AdminRegex } from '@/utils/validation';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    admin_id: z
      .string()
      .min(1, { message: '아이디를 입력해주세요.' })
      .regex(AdminRegex.admin_id, {
        message: '아이디는 한글, 영어, 숫자만 가능합니다.',
      }),
    admin_name: z
      .string()
      .min(1, { message: '이름를 입력해주세요.' })
      .regex(AdminRegex.admin_name, {
        message: '이름은 한글만 입력 가능합니다.',
      }),
    medicalcenter_name: z
      .string()
      .min(1, { message: '소속기관명을 입력해주세요.' })
      .regex(AdminRegex.medicalcenter_name, {
        message: '소속기관명은 한글, 영어 대소문자, 공백, 괄호만 허용됩니다.',
      }),
    medicalcenter_number: z
      .string()
      .min(1, { message: '요양기관번호를 입력해주세요.' })
      .regex(AdminRegex.medicalcenter_number, {
        message: '올바른 요양기관번호를 입력해주세요.',
      }),
    password: z
      .string()
      .min(1, { message: '비밀번호를 입력해주세요.' })
      .regex(AdminRegex.password, {
        message:
          '비밀번호는 영어 대소문자, 숫자, 그리고 특수문자를 1개 이상 포함해야 합니다.',
      }),
    confirm_password: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해주세요.' }),
  })
  .refine(checkPasswords, {
    message: '입력된 비밀번호가 일치하지 않습니다.',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    admin_id: formData.get('admin_id')?.toString() ?? '',
    admin_name: formData.get('admin_name')?.toString() ?? '',
    medicalcenter_name: formData.get('medicalcenter_name')?.toString() ?? '',
    medicalcenter_number:
      formData.get('medicalcenter_number')?.toString() ?? '',
    password: formData.get('password')?.toString() ?? '',
    confirm_password: formData.get('confirm_password')?.toString() ?? '',
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return {
      error: result.error.flatten(),
      values: data,
    };
  } else {
    const admin = await db.admin.create({
      data: {
        admin_id: result.data.admin_id,
        admin_name: result.data.admin_name,
        medicalcenter_name: result.data.medicalcenter_name,
        medicalcenter_number: Number(result.data.medicalcenter_number),
        password: result.data.password,
      },
      select: {
        id: true,
      },
    });

    redirect('/login');
  }
}
