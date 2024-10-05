import { z } from "zod"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png'];

export const formSchema = z.object({
  username: z.string().min(1, "Username is required").max(40),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  profileImage: z
    .instanceof(FileList)
    .nullable()
    .refine((fileList) => {
      if (!fileList || fileList.length === 0) return true;

      const file = fileList[0];
      return file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 3MB')
    .refine((fileList) => {
      if (!fileList || fileList.length === 0) return true;

      const file = fileList[0];
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, 'File must be a PNG'),
})