import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

const categories = [
  { id: 1, name: '수학' },
  { id: 2, name: '영어' },
  { id: 3, name: '과학' }
]

export default function FileShare() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id)
  const [files, setFiles] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  // 선택한 카테고리의 파일 목록 불러오기
  useEffect(() => {
    loadFiles(selectedCategory)
  }, [selectedCategory])

  const loadFiles = async (catId) => {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('category_id', catId)
      .order('created_at', { ascending: false })

    if (!error) setFiles(data)
  }

  const handleUpload = async () => {
    if (!title || !url) return alert('제목과 링크를 입력해주세요')

    const { error } = await supabase
      .from('files')
      .insert([{ title, url, category_id: selectedCategory }])

    if (!error) {
      setTitle('')
      setUrl('')
      loadFiles(selectedCategory)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* 카테고리 버튼 */}
      <div style={{ marginBottom: '16px' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              marginRight: '8px',
              padding: '6px 12px',
              background: selectedCategory === cat.id ? 'lightblue' : '#eee'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 업로드 입력 */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: '8px' }}
        />
        <input
          type="text"
          placeholder="공유 링크"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ marginRight: '8px' }}
        />
        <button onClick={handleUpload}>저장</button>
      </div>

      {/* 파일 리스트 */}
      <ul>
        {files.map(file => (
          <li key={file.id}>
            <a href={file.url} target="_blank" rel="noreferrer">
              {file.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}