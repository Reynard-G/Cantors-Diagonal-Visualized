"use client"

import { useState, useEffect } from 'react'
import { Image } from '@nextui-org/image'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Spinner } from '@nextui-org/spinner'
import { useDisclosure } from '@nextui-org/use-disclosure'

export default function Home() {
  const [table, setTable] = useState<number[][]>([])
  const [isTableLoading, setIsTableLoading] = useState<boolean>(true)
  const [diagonal, setDiagonal] = useState<number[]>([])
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const randomizeTable = () => {
    let newTable: number[][] = []
    setIsTableLoading(true)

    console.time("Randomized Table In")
    for (let i = 0; i < 10; i++) {
      let row: number[] = []
      for (let j = 0; j < 10; j++) {
        row.push(Math.round(Math.random()))
      }
      newTable.push(row)
    }
    console.timeEnd("Randomized Table In")

    setTable(newTable)
    setIsTableLoading(false)
    setDiagonal(newTable.map((row, i) => row[i]))
  }

  useEffect(() => {
    randomizeTable()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mt-8 px-4">Cantor&apos;s Diagonal Argument</h1>

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Info</ModalHeader>
              <ModalBody>
                <p>
                  Cantor&apos;s diagonal argument is a mathematical proof that demonstrates the existence of
                  more real numbers than natural numbers, despite both sets being infinite. The proof
                  shows that it is impossible to list all real numbers in a table. This is because there
                  is always a real number that is not in the table. Cantor achieved this by taking the
                  diagonal of the table and flipping the digits. This number is not in the table because
                  it differs from every number in the table in at least one digit. In this visualization,
                  the diagonal of the table is <span className="text-red-500">{diagonal.join("")}</span>,
                  which is updated every time the table is randomized.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} color="danger" variant="ghost">
                  Close
                </Button>
                <Button
                  variant="ghost"
                  onPress={randomizeTable}
                  startContent={<Image alt="Randomize" src="/randomDice.svg" width={24} height={24} />}
                >
                  Randomize
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Table
        hideHeader={true}
        aria-label="Cantor's Diagonal Argument Table"
        className="w-full sm:w-3/4 md:w-1/2 mx-auto my-8 px-4"
        classNames={{
          table: "min-h-[100px]"
        }}
      >
        <TableHeader>
          <TableColumn>1</TableColumn>
          <TableColumn>2</TableColumn>
          <TableColumn>3</TableColumn>
          <TableColumn>4</TableColumn>
          <TableColumn>5</TableColumn>
          <TableColumn>6</TableColumn>
          <TableColumn>7</TableColumn>
          <TableColumn>8</TableColumn>
          <TableColumn>9</TableColumn>
          <TableColumn>10</TableColumn>
        </TableHeader>

        <TableBody
          isLoading={isTableLoading}
          loadingContent={<Spinner size="lg" />}
        >
          {table.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j} className={i === j ? 'text-red-500' : ''}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="ghost"
          onPress={randomizeTable}
          startContent={<Image alt="Randomize" src="/randomDice.svg" width={24} height={24} />}
        >
          Randomize
        </Button>
        <Button
          variant="ghost"
          onPress={onOpen}
          startContent={<Image alt="Info" src="/info.svg" width={24} height={24} />}
        >
          Info
        </Button>
      </div>
    </div>
  )
}
