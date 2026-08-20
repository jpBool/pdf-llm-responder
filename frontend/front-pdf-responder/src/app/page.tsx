import Header from "@/components/Header";
import PdfUploader from "@/components/PdfUploader";
import { insertNewUserDb } from "@/supabase/teste";

export default function Home() {
  
  insertNewUserDb({
    email:"doqwij",
    first_name:"iqjowdi",
    last_name:"qwojidq",
    password:"woqdj",
    username:"wdoqij"
  })
  
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Header/>

        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            PDF Responder
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Upload your pdf, ask and resume it using our AI
          </p>
        </div>
        
        <PdfUploader />
        
      </div>
    </main>
  );
}