import Editor from '@monaco-editor/react'
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import { useState, useEffect } from 'react'
import Tournament from './tournament'
// @ts-expect-error idk
import 'react-tabs/style/react-tabs.css';

function App() {
  const [json1, setJson1] = useState(localStorage.getItem('json1') ?? '')
  const [json2, setJson2] = useState(localStorage.getItem('json2') ?? '')

  const [displayed, setDisplayed] = useState(false)

  useEffect(() => {
    // @ts-expect-error any
    const handleSaveShortcut = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault()
        localStorage.setItem('json1', json1)
        localStorage.setItem('json2', json2)
      }
    }

    window.addEventListener('keydown', handleSaveShortcut)
    return () => window.removeEventListener('keydown', handleSaveShortcut)
  }, [json1, json2])

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>match.json</Tab>
          <Tab>structure.json</Tab>
        </TabList>

        <TabPanel>
          <Editor height='60vh' defaultLanguage='json' onChange={(v) => setJson1(v ?? '')} value={json1} options = {{ minimap: { enabled: false } }} />
        </TabPanel>
        <TabPanel>
          <Editor height='60vh' defaultLanguage='json' onChange={(v) => setJson2(v ?? '')} value={json2} options = {{ minimap: { enabled: false } }} />
        </TabPanel>
      </Tabs>

      <button onClick={() => setDisplayed((disp) => !disp)}>!!!</button>

      {displayed ? <Tournament data={json1} structure={json2} /> : <></>}

    </div>
  )
  
}

export default App
