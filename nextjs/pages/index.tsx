import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
       <h1>FLOOR 101 NFT Lending</h1>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
               Lend up to $200 in DAI using your LENS PROFILE NFT as collateral.<br />
                <Link href="/lend" passHref className="link">
               Click here to go to the loans page.</Link><br />
               Introductory interest rate on loans is 3% p/a. around 2 cents a day for a $200 loan.<br />
               Max length of a loan is 30 days
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <p>
              Supply DAI to the vault to earn interest made from lending and liquidations.<br />     
                <Link href="/vault" passHref className="link">
          Go to the Vault page.
                </Link> 
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
