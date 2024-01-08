import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

const HomeContainer = () => {
  return (
    <div>
      <section
        id="home"
        className="relative z-10 overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
      >
        <div>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center flex flex-col items-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Welcome to Dersigo
                </h1>
                <p className="mb-12 text-base font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  This is a project prepared for a task. The project aims to use user and post requests using the
                  Dumyapi Api service.
                </p>
                <div className="lg:flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href={"/users"}
                    className="rounded-md bg-primary py-4 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 hover:text-sky-800"
                  >
                    Users
                  </Link>
                  <Link
                    href={"/posts"}
                    className="rounded-md bg-black/20 py-4 px-8 text-base font-semibold text-black duration-300 ease-in-out hover:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
                  >
                    Posts
                  </Link>
                </div>
                <Link
                  href={"https://github.com/VectortheGreat/DersiGo"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-sky-800 mt-10 lg:space-x-2 duration-300"
                >
                  <p className="text-sm lg:text-lg">
                    Click for
                    <span className="ml-1">
                      source code
                      <AiFillGithub className="h-8 w-8 lg:h-16 lg:w-16 inline-block ml-4" />
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContainer;
