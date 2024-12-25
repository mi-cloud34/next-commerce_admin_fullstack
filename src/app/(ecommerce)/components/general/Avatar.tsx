import Image from 'next/image'
import {RxAvatar} from 'react-icons/rx'
interface AvatarProps {
    image?: string
}
const Avatar:React.FC<AvatarProps> = ({image}) => {
   if(image) return <Image src={image} alt="avatar" width={100} height={100}/>
   return <div><RxAvatar/></div>
}

export default Avatar