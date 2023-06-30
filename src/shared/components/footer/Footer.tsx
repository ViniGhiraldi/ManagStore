import { Copyright, Github, Instagram, Linkedin, Mail, Send } from "lucide-react"

export const Footer = () => {
    return(
        <div className='bg-zinc-300 p-4 space-y-4 absolute'>
            <div className='flex justify-between flex-wrap'>
                <div className='flex flex-col items-center w-1/3 lg:w-1/2 sm:w-full p-4 sm:px-0 gap-4'>
                    <span className='text-xl text-center'>Redes Sociais</span>
                    <div className='flex w-full justify-between gap-4'>
                        <a href='https://www.instagram.com/vinighiraldi' target='_blank' className='flex flex-col items-center gap-2 group'>
                            <div className='p-2 rounded-full group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:via-red-500 group-hover:to-yellow-500 group-hover:text-white'>
                                <Instagram size={24} strokeWidth={1.5}/>
                            </div>
                            <span className='text-sm sm:hidden'>@ViniGhiraldi</span>
                        </a>
                        <a href='https://github.com/ViniGhiraldi' target='_blank' className='flex flex-col items-center gap-2 group'>
                            <div className='p-2 rounded-full group-hover:bg-black group-hover:text-white'>
                                <Github size={24} strokeWidth={1.5}/>
                            </div>
                            <span className='text-sm sm:hidden'>ViniGhiraldi</span>
                        </a>
                        <a href='https://www.linkedin.com/in/vinighiraldi/' target='_blank' className='flex flex-col items-center gap-2 group'>
                            <div className='p-2 rounded-full group-hover:bg-blue-600 group-hover:text-white'>
                                <Linkedin size={24} strokeWidth={1.5}/>
                            </div>
                            <span className='text-sm sm:hidden'>ViniGhiraldi</span>
                        </a>
                    </div>
                </div>
                <div className='flex flex-col items-center w-1/3 lg:w-1/2 sm:w-full p-4 sm:px-0 gap-4'>
                    <span className='text-xl text-center'>Descrição do Projeto</span>
                    <span className='text-sm text-justify'>Este projeto Full-Stack nasceu com o propósito de testar na prática tudo o que eu aprendi nos últimos meses, desde a criação de uma API até a utilização do TailwindCss com TypeScript no React. Para mais detalhes, <a href='https://github.com/ViniGhiraldi' className='text-orange-500 hover:text-orange-600' target='_blank'>clique aqui e acesse o repositório no GitHub</a>.</span>
                </div>
                <div className='flex flex-col items-center w-1/3 lg:w-1/2 sm:w-full p-4 sm:px-0 gap-4'>
                    <span className='text-xl text-center'>Contato</span>
                    <div className='flex flex-col items-start gap-2'>
                        <a href='https://mail.google.com/' className='flex items-center gap-2 group' target='_blank'>
                            <div className='p-2 rounded-full group-hover:bg-gradient-to-br group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-indigo-500 group-hover:text-white'>
                                <Mail size={24} strokeWidth={1.5}/>
                            </div>
                            <span className='text-sm'>vinighiraldi198@gmail.com</span>
                        </a>
                        <a href='https://www.instagram.com/vinighiraldi' className='flex items-center gap-2 group' target='_blank'>
                            <div className='p-2 rounded-full group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:via-red-500 group-hover:to-yellow-500 group-hover:text-white'>
                                <Send size={24} strokeWidth={1.5}/>
                            </div>
                            <span className='text-sm'>@ViniGhiraldi</span>
                        </a>
                    </div>
                </div>
            </div>
            <span className='flex justify-center gap-2 text-xs'>Vinícius Correia Ghiraldi <Copyright size={12} strokeWidth={1.5}/> 2023</span>
        </div>
    )
}