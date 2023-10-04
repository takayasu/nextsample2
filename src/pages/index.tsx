import React from 'react'
import SearchUser from '@/components/organism/SearchUser'

export default function Home() {
  const [user, setUser] = React.useState('takayasu')

  return (
    <div className="m-8 flex flex-col items-center">
      <SearchUser user={user}/>

    </div>)
}
