import { type NextPage } from "next"
import { useRouter } from "next/router"

const ProfilePage:NextPage = () => {
    const router = useRouter()
    const { slug } = router.query
    return (
        <div>
            <h1>Profile</h1>
            <p>{slug}</p>
        </div>
    )
}

export default ProfilePage