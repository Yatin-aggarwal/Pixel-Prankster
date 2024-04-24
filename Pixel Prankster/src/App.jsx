import { useEffect,useCallback , useState } from 'react'

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/ehristoforu/dalle-3-xl-v2",
    {
      headers: { Authorization: "" },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}



function App() {
  const [inputs , set_input] = useState("")
  const [loading , setloading] = useState(-1)
  const [searchString, setSearchString] = useState("");
  const [url, seturl] = useState("")
  useEffect(()=>{
   query({"inputs": inputs}).then((response) => {
    setloading(1);
    let urls = "";
    if(inputs==""){
      seturl(urls);
    }
    else {
      urls=URL.createObjectURL(response);  
      seturl(urls);
    }
    });

    },[inputs]);






  return (
    <>
   <div className='bg-black h-screen w-full  flex justify-center '>
   <div className='w-full flex justify-center'>
   {loading ==1 && <img src={url} alt="" id ="hi" className='object-cover'   />}
   {loading == 0 && <svg aria-hidden="true" class="mt-80 inline w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>}
   </div>
   <div className='fixed bottom-0  w-full'>
    
  <div className='flex'>
  <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        id = "texts"
        placeholder='Enter text'
        className='text-gray-50  bg-black   rounded-full h-11  w-11/12  mx-5 border-4  border-double border-spacing-10 pl-6'
      />
    <button type='button'  onClick={()=>{set_input(document.getElementById("texts").value),setloading(0) }} className=" h-12 w-12 bg-emerald-500 rounded-full flex flex-wrap items-center justify-center" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg></button>
  </div>
    
   </div>

   </div>

    </>
  )
}

export default App
