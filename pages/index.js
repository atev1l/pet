import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import dynamic from 'next/dynamic';

const House = dynamic(() => import('../components/House'), {
    ssr: false,
});

export default function Home({ allPostsData }) {

    return (
        <>
            <House />
            <div className={utilStyles.banner_block}>
                <div>
                    333
                </div>
                <div>
                    2222233
                </div>

                <div>
                    <canvas id='webgl' className='webgl' />
                </div>
            </div>
        </>
    );
}
//
// <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
//     <h2 className={utilStyles.headingLg}>Blog</h2>
//     <ul className={utilStyles.list}>
//         {allPostsData.map(({ id, date, title }) => (
//             <li className={utilStyles.listItem} key={id}>
//                 {title}
//                 <br />
//                 {id}
//                 <br />
//                 {date}
//             </li>
//         ))}
//     </ul>
// </section>
// <Head>
//     <title>{siteTitle}</title>
// </Head>
// <section className={utilStyles.headingMd}>
//     <p>Ебаный рот этого казино</p>
//     <p>
//         Кен ю фикс ве брокен?
//     </p>
// </section>

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}
