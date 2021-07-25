import { useContext, useEffect, useState } from "react"
import { BooksContext } from "context-api/BooksContext"
import { useRouter } from "next/router"
import Image from 'next/image'
import Link from "next/link"
import isEmpty from "lodash/isEmpty"
import Container from "@material-ui/core/Container"
import Head from "next/head"
import BackArrowIcon from '@material-ui/icons/KeyboardBackspace'
import Button from "@material-ui/core/Button"
import "tachyons"

const MoreInfo = () => {
  const { books } = useContext(BooksContext)
  const router = useRouter()
  const { id } = router.query
  const [book, setBook] = useState()

  useEffect(() => {
    books && setBook(books.find(book => book.id === id))
    isEmpty(books) && router.push('/')
  }, [id, books])


  if (!book) return null

  const { title, author, isbn, cover } = book
  const otherAuthoredBooks = books.filter(book => book.author === author && book.id !== id)

  return (
    <Container maxWidth='md' className='flex justify-center'>
      <Head>
        <title>More Info</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='tc'>
        <h1 className='tc'>More Info</h1>
      </header>

      <div className='flex flex-wrap mh6'>
        <div className='flex'>
          <section className='mr3'>
            <p className='b'>Book Title:</p>
            <p className='b'>Author:</p>
            <p className='b'>ISBN:</p>
          </section>
          <section>
            <p>{title}</p>
            <p>{author}</p>
            <p>{isbn}</p>
          </section>
        </div>

        <div style={{ position: 'relative', width: 640, height: 480 }}>
          <Image alt={title} src={cover} layout="fill" objectFit="cover" />
        </div>

        {!isEmpty(otherAuthoredBooks) && (
          <section>
            <h4 className='mb0'>Other books by same Author:</h4>
            <ul className='pl3 w-100'>
              {otherAuthoredBooks.map(book => (
                <li key={book.id}>
                  <Link href={`/more-info/${book.id}`}>
                    <a className='underline-hover flex items-center'>
                      <p className='ml0 mt0 mb2'>{book.title}</p>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <Link href={`/`}>
          <a className='ml0 w-100 pv3 flex items-center'>
            <Button variant='contained' className='pointer' classes={{ label: 'ttn' }}>
              <BackArrowIcon />
              <span className='ml2 f5'>Back to list</span>
            </Button>
          </a>
        </Link>
      </div>
    </Container>
  )
}

export default MoreInfo