
import express from 'express'
import fs from 'fs'
const app = express()

app.use(express.json())
const readData = ((filename) => JSON.parse(fs.readFileSync(`./data/${filename}`, 'utf-8')))

const writeData = ((filename, data) => fs.writeFileSync(`./data/${filename}`, JSON.stringify(data, null, 2)))

// apis 
// login api
  app.get('/api/login', (req,resp) => {
    const data = readData('login.json')
    resp.json(data)
  })

  app.post('/api/login', (req, resp) => {
    const data = readData('login.json')

    const alreadyloggedin = data.find(user => user.email === req.body.email)
    if(alreadyloggedin) {
        return resp.json({success: false, 
          message: "You have Already logged in"} )
    }


    const new_User = { id: Date.now(), email: req.body.email, loginTime: new Date().toLocaleTimeString()}
    data.push(new_User)
    writeData('login.json', data)
    resp.json({success: true, _user: new_User})
  })

  app.delete('/api/login/:id', (req, resp) => {
    let data = readData('login.json')
    data = data.filter((atom) => atom.id !== parseInt(req.params.id))
    resp.json({success: true })
  })

// =============
// ============
 app.get('/api/materials', (req, resp) => {
    const data = readData('materials.json')
    resp.json(data)
 })
 app.post('/api/materials', (req, resp) => {
const data = readData('materials.json')
const newMaterial = { id: Date.now(), ...req.body}
data.push(newMaterial)
writeData('materials.json', data)
resp.json({success: true , material: newMaterial})

 })

//  delete api 

 app.delete('/api/materials/:id', (req, resp) => {
    let data = readData('materials.json')
    data = data.filter((item) => item.id !== parseInt(req.params.id))
    writeData('materials.json', data)
    resp.json({success: true})

 })
//  data of workers start from here

app.get('/api/worker', (req,resp) => {
    const data = readData('workers.json')
    resp.json(data)
})
app.post('/api/worker', (req, resp) => {
    const data = readData('workers.json')
        const newWorker = { id: Date.now(), ...req.body}
    data.push(newWorker)
    writeData('workers.json', data)
    resp.json({success: true, worker: newWorker})

})
app.delete('/api/worker/:id', (req, resp) => {
    let data = readData('workers.json')
    data = data.filter((user) => user.id !== parseInt(req.params.id))
    writeData('workers.json', data)
    resp.json({ success: true})
})

//  detail of expenses is here
app.get('/api/expenses', (req, resp) => {
  const data = readData('expenses.json')
  resp.json(data)
})
app.post('/api/expenses', (req,resp) => {
    const data = readData('expenses.json')
    const newExpenses = { id: Date.now(), ...req.body}
    data.push(newExpenses)
    writeData('expenses.json', data)
    resp.json({success: true})
})
app.delete(`/api/expenses/:id`, (req, resp) => {
  let data = readData('expenses.json')
  data = data.filter(price => price.id !== parseInt(req.params.id))
  writeData('expenses.json', data)
  resp.json({success: true})
})
// timeline handling here:
 app.get('/api/timeline', (req,resp) => {
  const data = readData('timeline.json')
  resp.json(data)
 } )
 app.post('/api/timeline', (req, resp) => {
    const data = readData('timeline.json')
    const newPhase = { id: Date.now(), ...req.body }
    data.push(newPhase)
    writeData('timeline.json', data)
    resp.json({ success: true })
})

app.delete('/api/timeline/:id', (req, resp) => {
    let data = readData('timeline.json')
    data = data.filter(phase => phase.id !== parseInt(req.params.id))
    writeData('timeline.json', data)
    resp.json({ success: true })
})

 const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))