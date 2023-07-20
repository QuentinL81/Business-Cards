import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './IconNetwork.css'

export default function InconNetwork({
  image,
  label,
  name,
  addLink,
  removeLink,
}) {
  const [open, setOpen] = useState(false);

  const onClickButton = (link) => {
    if (open){
      removeLink(link)
      setOpen(false)
    }
    else{
      addLink(link)
      setOpen(true)
    }

  }

  return (
    <div className='icon-network'>
        <Button className='buttons'
          onClick={() => onClickButton({
            image: image,
            label: label,
            link: "",
            name: name,
          })}
          aria-controls="collapse-text"
          aria-expanded={open}
        >
          <img src={image} alt="Click here" />
        </Button>

     
    </div>
  )
}