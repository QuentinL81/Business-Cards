import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './IconNetwork.css'

export default function IconNetwork({
  imageOpen,
  imageClose,
  label,
  name,
  addLink,
  removeLink,
}) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(imageClose)
  const onClickButton = (link) => {
    if (open) {
      removeLink(link)
      setOpen(false)
      setImage(imageClose)
    }
    else {
      addLink(link)
      setOpen(true)
      setImage(imageOpen)
    }

  }

  return (
    <div className='icon-network'>
      <Button className='buttons'
        onClick={() => onClickButton({
          image: imageOpen,
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