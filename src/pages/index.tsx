import React from 'react'
import SearchUser from '@/components/organism/SearchUser'
import SearchUserBox from '@/components/moleculous/UserSearchBox'

export default function Home() {
  const [user, setUser] = React.useState('takayasu')

  const changeUser = (user: string) => {
    console.log(user);
    setUser(user);
  }

  return (
    <div className="m-8 flex flex-col items-center">
      <SearchUserBox setSearchUser={changeUser} />
      <SearchUser user={user}/>

    </div>)
}
