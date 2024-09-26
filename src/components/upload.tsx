"use client";
import { useEdgeStore } from '@/lib/edgestore'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [file, setFile] = useState<File>()
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>()
  useEffect(() => {
    console.log(urls);
  }, [urls])
  const { edgestore } = useEdgeStore()
  return (
    <div>
      <input type='file' onChange={(e) => setFile(e.target.files?.[0])} />
      <button 
        onClick={async() => {
          if(file){
            const res = await edgestore.myPublicImages.upload({ file })
            setUrls({
              url: res.url,
              thumbnailUrl: res.thumbnailUrl
            })
          }
        }}
      >
        Upload
      </button>
      {urls?.url && <Link href={urls.url} target='_blank'>URl</Link>}
      {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl} target='_blank'>Thumbnail URl</Link>}
    </div>
  )
}

