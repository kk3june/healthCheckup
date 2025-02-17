export const AdminRegex = {
  // admin_id: 한글, 영어 대소문자, 숫자만 허용
  admin_id: /^[가-힣a-zA-Z0-9]+$/,
  // admin_name: 한글만
  admin_name: /^[가-힣]+$/,
  // medicalcenter_name: 한글, 영어 대소문자, 공백, 괄호 허용
  medicalcenter_name: /^[가-힣a-zA-Z\s()]+$/,
  // medicalcenter_number: 8자리 숫자만 허용
  medicalcenter_number: /^[0-9]{8}$/,
  // password: 영어 대소문자, 숫자, 그리고 특수문자 허용
  password:
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
};
