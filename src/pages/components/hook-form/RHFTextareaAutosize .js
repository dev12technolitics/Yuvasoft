import { TextareaAutosize } from '@mui/material'
// import React from 'react'

export default function RHFTextareaAutosize() {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="Minimum 2 rows"
      style={{ width: 200 }}
    />
  )
}
