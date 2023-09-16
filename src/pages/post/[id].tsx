import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";
import { createServerSideGHelpers } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.posts.getById.useQuery({
    id,
  });
  if (!data) return <div>{data}</div>;

  return (
    <>
      <Head>
        <title>{`${data.content} - @${data.authorId}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};
export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = createServerSideGHelpers();
  
    const id = context.params?.id;
  
    if (typeof id !== "string") throw new Error("no id")
    ;
    const username = id.replace("@", "");

    await ssg.posts.getById.prefetch({ id });
  
    return {
      props: {
        trpcState: ssg.dehydrate(),
        username,
      },
    };
  };
  
  export const getStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
  };
  
  export default SinglePostPage;