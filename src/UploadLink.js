import { supabase } from './supabaseClient'
import { useState } from 'react'

export default function UploadLink() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const saveLink = async () => {
    if (!title || !url) return alert('제목과 링크를 입력하세요')
    await supabase.from('files').insert([{ title, url }])
    setTitle('')
    setUrl('')
    alert('저장 완료!')
  }

  return (
    <div>
      <input placeholder="제목" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="공유 링크" value={url} onChange={e => setUrl(e.target.value)} />
      <button onClick={saveLink}>저장</button>
    </div>
  )
}