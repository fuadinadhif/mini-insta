'use client';

import React, { useState, FormEvent, ChangeEvent, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [file, setFile] = useState<File | undefined>();
  const [caption, setCaption] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await response.json();

      if (data.response.ok) {
        setCaption('');

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        toast('📸 Image uploaded!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="h-full flex justify-center items-center">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Caption"
          className="border py-2 px-2"
          value={caption}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCaption(e.target.value)
          }
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) setFile(e.target.files[0]);
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`${isLoading ? 'bg-slate-300' : 'bg-slate-500'} mt-5  text-white py-2`}
        >
          {isLoading ? 'Loading..' : 'Submit'}
        </button>
      </form>
    </main>
  );
}
