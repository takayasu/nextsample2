import React from 'react'
import SearchUser from '@/components/organism/SearchUser'
import SearchUserBox from '@/components/moleculous/UserSearchBox'
import { RecoilRoot } from 'recoil'

export default function Home() {

  return (
    <RecoilRoot>
      <div className="m-8 flex flex-col items-center">
        <SearchUserBox  />
        <SearchUser />
      </div >
    </RecoilRoot>
  );
}
