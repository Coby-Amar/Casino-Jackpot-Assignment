import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
})

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    })
}

export default app
