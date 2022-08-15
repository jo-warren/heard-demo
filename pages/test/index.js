import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/shared/layout/layout";

export default function Test() {
    return (
    <>
        <Layout>
            <Head><title>Test Page</title></Head>
            <span>This is a test page</span>
            <span>Go back <Link href="/">home</Link></span>
        </Layout>
    </>
    )
}