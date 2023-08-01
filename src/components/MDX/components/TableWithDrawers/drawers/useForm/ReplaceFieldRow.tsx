import * as React from 'react'

import { DrawerCode } from '../../drawerComponents/Code'
import { DrawerCollectionConfig } from '../../drawerComponents/CollectionConfig'

export const UseFormHookReplaceFieldRow = () => {
  return (
    <>
      <h5>
        How to use <code>replaceFieldRow</code>
      </h5>
      <DrawerCode
        content={`
import { useForm } from "payload/components/forms";

export const CustomArrayManager = () => {
  const { replaceFieldRow } = useForm()

  function replaceArrayRow() {
    replaceFieldRow({
      path: "arrayField",
      rowIndex: 0,
      data: {
        textField: "updated text",
      },
    })
  }

  return (
    <button
      type="button"
      onClick={replaceArrayRow}
    >
      Replace Row
    </button>
  )
}
`}
      />
      <br />
      <DrawerCollectionConfig type="array-example" />
    </>
  )
}
