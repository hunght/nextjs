import Link from 'next/link'

const Home: React.FC = () => {
  return (
    <ul>
      <li>
        <Link
          href={{
            pathname: '/blog/[slug]',
            query: { slug: 'my-post' },
          }}
        >
          <a>Hello world</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home
