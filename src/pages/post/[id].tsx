import { type NextPage } from "next"
import { useRouter } from "next/router"

const SinglePostPage:NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>
            <h1>Profile</h1>
            <p>{id}</p>
        </div>
    )
}

export default SinglePostPage