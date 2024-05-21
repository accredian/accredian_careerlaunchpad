// @ts-nocheck
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5"
import { careerLaunchpad, checkUser } from "../services/career.service";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import Loader from "../compoenents/loader";



const Home = () => {

  const [resumeFileName, setResumeFileName] = useState('');
  const [headShotFileName, setHeadShotFileName] = useState('');
  const [userId, setUserId] = useState(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      linkedIn: "",
      github: "",
      resume: null,
      professional_headshot: null
    },
    mode: "onChange"
  });

  const watchHeadShotFileName = watch('professional_headshot');

  useEffect(() => {
    if (watchHeadShotFileName && watchHeadShotFileName.length > 0) {
      setHeadShotFileName(watchHeadShotFileName[0].name);
    }
  }, [watchHeadShotFileName]);

  const { mutate, isPending: isCareerLaunchPadPending } = useMutation({
    mutationFn: (body) => careerLaunchpad({ body }),
    onSuccess: (res) => {
      navigate('/thank-you')
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        title: "Oops!",
        text: "some error Occurred!",
        icon: "error",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          reset("")
        }
      });
    }
  })

  const watchResumeFile = watch('resume');

  useEffect(() => {
    if (watchResumeFile && watchResumeFile.length > 0) {
      setResumeFileName(watchResumeFile[0].name);
    }
  }, [watchResumeFile]);

  const submitForm = (body) => {
    try {
      const { email, linkedIn, github, resume, professional_headshot } = body;

      const payload = new FormData();

      const data = {
        email,
        linkedIn,
        github,
        resume: resume[0],
        professional_headshot: professional_headshot[0],
        user_id: userId,
      };

      for (const key in data) {
        payload.append(key, data[key]);
      }

      mutate(payload);

    } catch (error) {
      console.log(error);
    }
  };

  const { mutate: checkUserMutate, isPending } = useMutation({
    mutationFn: (email) => checkUser({
      email
    }),
    onSuccess: (res) => {
      if (res.data) {
        setUserId(res.data.data.id)
      }
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        title: "Oops!",
        text: "It appears the email you provided is not linked to any existing accounts. Please review the email address or register if you're a new user.",
        icon: "error",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          reset("")
        }
      });
    }
  })

  const emailWatch = watch("email")

  const handleBlur = async () => {
    if (emailWatch && emailWatch.length > 0) {
      checkUserMutate(emailWatch)
    }
  };

  return (
    <div className="home w-full min-h-screen flex items-center justify-center md:py-8 font-circular">
      <div className="md:max-w-lg max-md:h-screen w-full py-6 px-5 bg-white md:drop-shadow-xl md:rounded-lg border flex flex-col items-center">
        <div className="w-full max-w-[200px]">
          <img className="w-full" src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/faculty_portal_accredian_cropped_logo.webp" alt="logo" />
        </div>
        <div className="w-full px-5">
          <form className="w-full h-full min-h-[24rem] flex flex-col justify-between mt-4" onSubmit={handleSubmit(submitForm)}>
            <div className="w-full">
              {/* email */}
              <div className="relative w-full md:flex-1">
                <h2 className="font-medium text-base">Email <span className="text-neutral-400">(required)</span></h2>
                <input className={`w-full px-4 py-3 font-normal bg-white border-2 rounded-lg outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
${errors["email"] ? "border-rose-500" : "border-neutral-300"} 
${errors["email"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  id="email"
                  type="email"
                  placeholder="Your email"
                  onBlur={handleBlur}
                />
                <div className="">
                  {errors.email?.message && (
                    <div className="text-red-500 text-xs w-full font-semibold flex items-center gap-1 mt-2">
                      <span className="mt-[-1px]">
                        <IoWarning />
                      </span>
                      <p>{errors.email?.message}</p>
                    </div>
                  )}
                </div>
              </div>
              {/* Linkedin */}
              <div className="mt-2 relative w-full md:flex-1">
                <h2 className="font-medium text-base">Linkedin</h2>
                <input className={`w-full px-4 py-3 font-normal bg-white border-2 rounded-lg outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
                  ${errors["linkedIn"] ? "border-rose-500" : "border-neutral-300"} 
                  ${errors["linkedIn"] ? "focus:border-rose-500" : "focus:border-blue-500"}
                `}
                  {...register("linkedIn", {
                    pattern: {
                      message: "Please enter a valid linkedIn profile url",
                      value: /^https?:\/\/(www\.)?linkedin\.com\/in\/([a-zA-Z0-9-]+)/
                    }
                  })}
                  id="linkedIn"
                  type="text"
                  placeholder="https://www.linkedin.com/in/your-profile"
                />
                <div className="">
                  {errors.linkedIn?.message && (
                    <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                      <span className="mt-[-1px]">
                        <IoWarning />
                      </span>
                      <p>{errors.linkedIn?.message}</p>
                    </div>
                  )}
                </div>
              </div>
              {/* github */}
              <div className="mt-2 relative w-full md:flex-1">
                <h2 className="font-medium text-base">Github</h2>
                <input className={`w-full px-4 py-3 font-normal bg-white border-2 rounded-lg outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
                  ${errors["github"] ? "border-rose-500" : "border-neutral-300"} 
                  ${errors["github"] ? "focus:border-rose-500" : "focus:border-blue-500"}
                  `}
                  {...register("github", {
                    pattern: {
                      message: "Please enter a valid github profile url",
                      value: /^https?:\/\/(www\.)?github\.com\/([a-zA-Z0-9-]+)/
                    }
                  })}
                  id="github"
                  type="text"
                  placeholder="https://github.com/username"
                />
                <div className="">
                  {errors.github?.message && (
                    <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                      <span className="mt-[-1px]">
                        <IoWarning />
                      </span>
                      <p>{errors.github?.message}</p>
                    </div>
                  )}
                </div>
              </div>
              {/* upload resume */}
              <div className="relative mt-2">
                <h2 className="font-medium text-base">Resume <span className="text-neutral-400">(required)</span></h2>
                <label className={`w-full py-4 px-4 flex sm:flex-row flex-col items-center justify-between cursor-pointer border border-dashed ${errors?.resume?.message ? "border-red-500" : (!errors?.resume?.message && resumeFileName) ? "border-green-500" : "border-neutral-400"} rounded-lg mt-2`} htmlFor="resume">
                  <div className="flex items-center gap-2 sm:justify-normal justify-between w-full">
                    {resumeFileName && !errors?.resume?.message ? (
                      <div className="w-8 h-8 flex-shrink-0">
                        <svg className="w-full h-full" fill="#22c55e" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7c.39-.39.39-1.02 0-1.41-.39-.39-1.03-.39-1.42 0z"></path></svg>
                      </div>
                    ) : (
                      <div className="w-8 h-8 flex-shrink-0">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill={errors?.resume?.message ? "#ef4444" : "#94A3B8E6"} viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
                      </div>
                    )}
                    <h1 className={`text-sm md:text-base ${errors?.resume?.message ? "text-red-500" : (!errors?.resume?.message && resumeFileName) ? "text-green-500" : "text-slate-400/90"} font-medium`}>{resumeFileName && !errors?.resume?.message ? "Resume uploaded successfully" : "Upload your resume"}</h1>
                  </div>
                  <div className="sm:block hidden">
                    {resumeFileName && !errors?.resume?.message ? (
                      <h4 className={`text-base text-slate-400/90 font-medium`}>{resumeFileName}</h4>
                    ) : (
                      <h4 className={`text-base ${errors?.resume?.message ? "text-red-500" : "text-slate-400/90"} font-medium`}>{errors?.resume?.message ? errors?.resume?.message : "PDF | Max: 2 MB"}</h4>
                    )}
                  </div>
                  <input
                    {...register("resume", {
                      required: {
                        value: true,
                        message: "Resume is required",
                      },
                      validate: {
                        checkFileSize: (value) => value[0].size < 2000000 || 'The file is too large',
                        checkFileType: (value) => value[0].type === 'application/pdf' || 'Only PDF files are allowed'
                      }
                    })}
                    id="resume"
                    className="hidden"
                    type="file"
                    accept=".pdf"
                  />
                </label>
                <div className="block sm:hidden mt-2">
                  {resumeFileName && !errors?.resume?.message ? (
                    <h4 className={`text-sm text-slate-400/90 font-medium`}>{resumeFileName}</h4>
                  ) : (
                    <h4 className={`text-sm ${errors?.resume?.message ? "text-red-500" : "text-slate-400/90"} font-medium`}>{errors?.resume?.message ? errors?.resume?.message : "PDF | Max: 2 MB"}</h4>
                  )}
                </div>
              </div>
              {/* Professional Headshot */}
              <div className="relative mt-2">
                <h2 className="font-medium text-base">Professional Headshot <span className="text-neutral-400">(required)</span></h2>
                <label className={`w-full py-4 px-4 flex items-center justify-between cursor-pointer border border-dashed ${errors?.professional_headshot?.message ? "border-red-500" : (!errors?.professional_headshot?.message && headShotFileName) ? "border-green-500" : "border-neutral-400"} rounded-lg mt-2`} htmlFor="head-shot">
                  <div className="flex items-center gap-2 sm:justify-normal justify-between w-full">
                    {headShotFileName && !errors?.professional_headshot?.message ? (
                      <div className="w-8 h-8 flex-shrink-0">
                        <svg className="w-full h-full" fill="#22c55e" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="check"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7c.39-.39.39-1.02 0-1.41-.39-.39-1.03-.39-1.42 0z"></path></svg>
                      </div>
                    ) : (
                      <div className="w-8 h-8 flex-shrink-0">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill={errors?.professional_headshot?.message ? "#ef4444" : "#94A3B8E6"} viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
                      </div>
                    )}
                    <h1 className={`text-sm md:text-base ${errors?.professional_headshot?.message ? "text-red-500" : (!errors?.professional_headshot?.message && headShotFileName) ? "text-green-500" : "text-slate-400/90"} font-medium`}>{headShotFileName && !errors?.professional_headshot?.message ? "Professional Headshot uploaded successfully" : "Upload your Professional Headshot"}</h1>
                  </div>
                  <div className="sm:block hidden">
                    {headShotFileName && !errors?.professional_headshot?.message ? (
                      <h4 className={`text-base text-slate-400/90 font-medium`}>{headShotFileName}</h4>
                    ) : (
                      <h4 className={`text-base ${errors?.professional_headshot?.message ? "text-red-500" : "text-slate-400/90 text-nowrap"} font-medium`}>{errors?.professional_headshot?.message ? errors?.professional_headshot?.message : "Image | Max: 2 MB"}</h4>
                    )}
                  </div>
                  <input
                    {...register("professional_headshot", {
                      required: {
                        value: true,
                        message: "Professional Headshot is required",
                      },
                      validate: {
                        checkFileSize: (value) => value[0].size < 2000000 || 'The file is too large',
                        checkFileType: (value) => value[0].type.includes('image/') || 'Only image files are allowed'
                      }
                    })}
                    id="head-shot"
                    className="hidden"
                    type="file"
                    accept="image/*"
                  />
                </label>
                <div className="block sm:hidden mt-2">
                  {headShotFileName && !errors?.professional_headshot?.message ? (
                    <h4 className={`text-sm text-slate-400/90 font-medium`}>{headShotFileName}</h4>
                  ) : (
                    <h4 className={`text-sm ${errors?.professional_headshot?.message ? "text-red-500" : "text-slate-400/90 text-nowrap"} font-medium`}>{errors?.professional_headshot?.message ? errors?.professional_headshot?.message : "Image | Max: 2 MB"}</h4>
                  )}
                </div>
              </div>
            </div>
            {/* submit button */}
            <button className={`disabled:py-6 disabled:bg-transparent hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md`} type="submit">
              Apply
            </button>
          </form>
        </div>
      </div>
      <Loader isLoading={isPending || isCareerLaunchPadPending} />
    </div>
  )
}

export default Home
