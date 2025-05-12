import {useState} from 'react'

const initialForm = {
  name:"",
  email:"",
  password:""
}

export const RegisterPage = () => {

  const [formData,setFormData] = useState(initialForm)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setFormData((prev) => ({...prev,[e.target.name]:e.target.value}))
  }

  return(
    <div className="w-full h-full">
      <form className="flex-col justify-center items-center mb-4 max-w-[400px] m-4 px-4 py-2 border border-black-500">
        <div className='flex w-full flex-col space-y-2'>
          <label className="block" htmlFor="name">Name</label>
          <input onChange={handleChange} className="border border-black-500 px-2 py-1 rounded-md" id="name" type="name" name="name" value={formData.name} />
        </div>
        <div className='flex w-full flex-col mb-4 space-y-2'>
          <label className="block" htmlFor="email">Email</label>
          <input onChange={handleChange} className="border border-black-500 px-2 py-1 rounded-md" id="email" type="email" name="email" value={formData.email} />
        </div>
        <div className='flex w-full mb-4 flex-col space-y-2'>
          <label className="block" htmlFor="password">Password</label>
          <input onChange={handleChange} className="border border-black-500 px-2 py-1 rounded-md" id="password" type="password" name="password" value={formData.password} />
        </div>
        <button 
          type="submit"
          className="h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white  dark:from-zinc-900 dark:to-zinc-900"
          >
          Sign up
        </button>
      </form>
    </div>
    
  )
}

