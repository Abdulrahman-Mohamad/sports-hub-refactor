import React from "react";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { FaCamera } from "react-icons/fa6";
import Image from "next/image";
import handleSingleFileChange from "@/utils/helperFn/handleSingleFileChange";


interface SingleMediaInputProps<T extends FieldValues> {
  title?: string;
  id: Path<T>;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  setValue: (field: Path<T>, value: any, options?: any) => void;
  placeholder?: string;
  register: UseFormRegister<T>;
  image?: string | null;
}

export default function UserMediaInput<T extends FieldValues>({
  title,
  id,
  setImage,
  setValue,
  // placeholder = "Add A Photo",
  register,
  image,
  
}: SingleMediaInputProps<T>) {
  return (
    <div>
      {title && <label className="block text-gray-700 font-semibold mb-2 capitalize">{title}</label>}
      <div className="relative  text-white rounded-full w-28 h-28  border border-secondaryA2 flex items-center justify-center">
        <label className="cursor-pointer ">
          <input
            type="file"
            accept="image/*"
            multiple
            {...register(id)}
            className="hidden"
            onChange={(e) => handleSingleFileChange(e, setImage, setValue, id)}
          />
        <div className="absolute inset-0 bg-black/30 w-full h-full rounded-full flex items-center justify-center z-10"><FaCamera size={28}/></div>
        <div className="w-24 aspect-square ">
              <Image
                src={image || "/user.svg"}
                alt="Preview"
                className="w-24 aspect-square object-contain rounded-full "
                width={1000}
                height={1000}
              />
          </div>
        </label>

      </div>
    </div>
  );
}
