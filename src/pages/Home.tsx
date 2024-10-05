import PageWrapper from "../components/PageWrapper"
import { Button } from "../components/ui/button"

const Home = () => {
  return (
    <PageWrapper>
      <div className="flex-1 flex justify-center items-center">
        <Button>Fetch user profiles</Button>
      </div>
    </PageWrapper>
  )
}

export default Home