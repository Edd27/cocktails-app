const Footer = (props) => {
  return (
    <footer>
      <div className="bg-zinc-800 h-16 flex items-center justify-center fixed w-full bottom-0 text-zinc-400">
        <p className="text-primary-400 text-md">
          Made with ❤️ by{' '}
          <a
            href="https://www.edgarbenavides.dev/"
            target="_blank"
            className="text-lime-500"
            rel="noreferrer"
          >
            Edgar
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
