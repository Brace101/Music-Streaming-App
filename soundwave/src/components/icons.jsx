export function HeadphonesIcon({ className = '' }) {
  return (
    <svg width="223" height="172" viewBox="0 0 223 172" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M27.875 129V86C27.875 68.8935 36.6855 52.4877 52.3682 40.3916C68.0509 28.2955 89.3213 21.5 111.5 21.5C133.679 21.5 154.949 28.2955 170.632 40.3916C186.315 52.4877 195.125 68.8935 195.125 86V129M195.125 136.167C195.125 139.968 193.167 143.614 189.682 146.302C186.197 148.99 181.47 150.5 176.542 150.5H167.25C162.321 150.5 157.595 148.99 154.11 146.302C150.625 143.614 148.667 139.968 148.667 136.167V114.667C148.667 110.865 150.625 107.219 154.11 104.531C157.595 101.843 162.321 100.333 167.25 100.333H195.125V136.167ZM27.875 136.167C27.875 139.968 29.8329 143.614 33.3179 146.302C36.803 148.99 41.5297 150.5 46.4583 150.5H55.75C60.6786 150.5 65.4054 148.99 68.8904 146.302C72.3755 143.614 74.3333 139.968 74.3333 136.167V114.667C74.3333 110.865 72.3755 107.219 68.8904 104.531C65.4054 101.843 60.6786 100.333 55.75 100.333H27.875V136.167Z"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MailIcon({ className = '' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M20.1667 5.50008C20.1667 4.49175 19.3417 3.66675 18.3334 3.66675H3.66671C2.65837 3.66675 1.83337 4.49175 1.83337 5.50008M20.1667 5.50008V16.5001C20.1667 17.5084 19.3417 18.3334 18.3334 18.3334H3.66671C2.65837 18.3334 1.83337 17.5084 1.83337 16.5001V5.50008M20.1667 5.50008L11 11.9167L1.83337 5.50008"
        stroke="#F3F3F3"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FacebookIcon({ className = '' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M16.5 1.83325H13.75C12.5344 1.83325 11.3686 2.31614 10.5091 3.17568C9.64951 4.03522 9.16663 5.20101 9.16663 6.41659V9.16659H6.41663V12.8333H9.16663V20.1666H12.8333V12.8333H15.5833L16.5 9.16659H12.8333V6.41659C12.8333 6.17347 12.9299 5.94031 13.1018 5.7684C13.2737 5.5965 13.5068 5.49992 13.75 5.49992H16.5V1.83325Z"
        stroke="#F3F3F3"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function EyeOffIcon({ className = '' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M2.25 2.25L15.75 15.75M7.935 7.935C7.65354 8.21646 7.49542 8.5982 7.49542 8.99625C7.49542 9.3943 7.65354 9.77604 7.935 10.0575C8.21646 10.339 8.5982 10.4971 8.99625 10.4971C9.3943 10.4971 9.77604 10.339 10.0575 10.0575M7.41 3.18C7.93195 3.06278 8.46506 3.00243 9 3C14.25 3 16.5 9 16.5 9C15.8815 10.1718 15.0902 11.2438 14.1525 12.18M4.5825 4.5825C2.76 5.925 1.5 7.5 1.5 7.5C1.5 7.5 3.75 13.5 9 13.5C10.0997 13.5084 11.1869 13.2673 12.18 12.795"
        stroke="#9A9A9A"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// The design only shows the "hidden" eye, so this "visible" state is drawn to match it.
export function EyeIcon({ className = '' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M1.5 9C1.5 9 3.75 3 9 3C14.25 3 16.5 9 16.5 9C16.5 9 14.25 15 9 15C3.75 15 1.5 9 1.5 9Z"
        stroke="#9A9A9A"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="9" r="2.25" stroke="#9A9A9A" strokeWidth="1.125" />
    </svg>
  )
}
