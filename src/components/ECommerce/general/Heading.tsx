

interface HeadingProps {
   center?: boolean
   text: string 
   size?:string
   click?:() => void
}
const Heading:React.FC<HeadingProps> = ({center, text,size}) => {
  return (
    <div className={`text-slate-500 my-3 md:my-5  px-3 md:px-10 cursor-pointer  md:${size} ${center ? "text-center" : "text-start"}`}>{text}</div>
  )
}

export default Heading