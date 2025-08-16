import { supabase } from './supabaseClient'
import { useEffect, useState } from 'react'

export default function FileList() {
  const [files, setFiles] = useState([])

  useEffect(() => {
    supabase.from('files').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setFiles(data || []))

    supabase.channel('files-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'files' },
        payload => setFiles(prev => [payload.new, ...prev])
      ).subscribe()
  }, [])

  return (
    <ul>
      {files.map(file => (
        <li key={file.id}>
          <a href={file.url} target="_blank" rel="noreferrer">{file.title}</a>
        </li>
      ))}
    </ul>
  )
}