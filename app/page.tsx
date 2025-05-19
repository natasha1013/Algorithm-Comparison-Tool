"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { FileUp, Play, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye } from "lucide-react"
import AlgorithmSteps from "@/components/algorithm-steps"

export default function Home() {
  const [dataSize, setDataSize] = useState(50)
  const [dataset, setDataset] = useState<number[]>([])
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("mergeSort")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [startRow, setStartRow] = useState(0)
  const [endRow, setEndRow] = useState(dataSize - 1)
  const [algorithmSteps, setAlgorithmSteps] = useState<any[]>([])

  const handleGenerateData = () => {
    // Simple placeholder function to generate random data
    const newData = Array.from({ length: dataSize }, () => Math.floor(Math.random() * 1000))
    setDataset(newData)
    setStartRow(0)
    setEndRow(Math.min(dataSize - 1, 999))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Placeholder for file upload
    console.log("File selected:", e.target.files?.[0]?.name)
  }

  const handleDownloadDataset = () => {
    // Placeholder for download functionality
    console.log("Download dataset")
  }

  const handleRunAlgorithm = () => {
    if (dataset.length === 0) {
      // Generate some data if none exists
      handleGenerateData()
      return
    }

    // Placeholder for algorithm execution
    // Just create some dummy steps for demonstration
    const dummySteps = [
      {
        action: "split",
        state: dataset.slice(startRow, startRow + 10),
        indices: [2, 5],
      },
      {
        action: "merge",
        state: dataset.slice(startRow, startRow + 10).sort((a, b) => a - b),
        indices: [0, 9],
      },
    ]

    setAlgorithmSteps(dummySteps)
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Algorithm Comparison Tool</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Dataset Generation</CardTitle>
            <CardDescription>Generate a random dataset or upload your own</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dataSize">Dataset Size: {dataSize}</Label>
              <Slider
                id="dataSize"
                min={10}
                max={1000}
                step={10}
                value={[dataSize]}
                onValueChange={(value) => setDataSize(value[0])}
              />
            </div>
            <Button onClick={handleGenerateData} className="w-full" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Random Data
            </Button>
            <div className="relative">
              <Button onClick={() => fileInputRef.current?.click()} className="w-full" variant="secondary">
                <FileUp className="mr-2 h-4 w-4" />
                Upload Dataset
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv,.txt" className="hidden" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-muted-foreground w-full">
              {dataset.length > 0 ? `Current dataset: ${dataset.length} items` : "No dataset loaded"}
            </div>

            <div className="flex w-full space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleDownloadDataset}
                disabled={dataset.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1" disabled={dataset.length === 0}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Data
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
                  <DialogHeader>
                    <DialogTitle>Dataset Preview</DialogTitle>
                  </DialogHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Index</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dataset.length > 0 ? (
                        dataset.slice(0, 100).map((value, index) => (
                          <TableRow key={index}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{value}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={2} className="text-center">
                            No data available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  {dataset.length > 100 && (
                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Showing first 100 of {dataset.length} items
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Algorithm Selection</CardTitle>
            <CardDescription>Choose an algorithm to visualize</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
              <SelectTrigger>
                <SelectValue placeholder="Select Algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mergeSort">Merge Sort</SelectItem>
                <SelectItem value="quickSort">Quick Sort</SelectItem>
                <SelectItem value="binarySearch">Binary Search</SelectItem>
              </SelectContent>
            </Select>

            {selectedAlgorithm === "binarySearch" && (
              <div className="text-sm text-muted-foreground mt-2">
                Note: For binary search, the data will be automatically sorted and a random value will be selected.
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleRunAlgorithm} className="w-full" disabled={dataset.length === 0}>
              <Play className="mr-2 h-4 w-4" />
              Run Algorithm
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Algorithm execution statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium">Steps</div>
                <div className="text-2xl font-bold">{algorithmSteps.length || "—"}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">Data Size</div>
                <div className="text-2xl font-bold">{dataset.length > 0 ? endRow - startRow + 1 : "—"}</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-medium">Space Complexity</div>
              <div className="text-lg">
                {selectedAlgorithm === "mergeSort"
                  ? "O(n)"
                  : selectedAlgorithm === "quickSort"
                    ? "O(log n)"
                    : selectedAlgorithm === "binarySearch"
                      ? "O(1)"
                      : "—"}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-medium">Time Complexity</div>
              <div className="text-lg">
                {selectedAlgorithm === "mergeSort"
                  ? "O(n log n)"
                  : selectedAlgorithm === "quickSort"
                    ? "O(n log n)"
                    : selectedAlgorithm === "binarySearch"
                      ? "O(log n)"
                      : "—"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Algorithm Steps</CardTitle>
          <CardDescription>Step-by-step execution details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="startRow">Start Row</Label>
              <Input
                id="startRow"
                type="number"
                min={0}
                max={dataset.length > 0 ? dataset.length - 1 : dataSize - 1}
                value={startRow}
                onChange={(e) => setStartRow(Math.max(0, Number.parseInt(e.target.value) || 0))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endRow">End Row</Label>
              <Input
                id="endRow"
                type="number"
                min={0}
                max={dataset.length > 0 ? dataset.length - 1 : dataSize - 1}
                value={endRow}
                onChange={(e) =>
                  setEndRow(
                    Math.min(
                      dataset.length > 0 ? dataset.length - 1 : dataSize - 1,
                      Number.parseInt(e.target.value) || 0,
                    ),
                  )
                }
              />
            </div>
          </div>

          <AlgorithmSteps steps={algorithmSteps} algorithm={selectedAlgorithm} startRow={startRow} endRow={endRow} />
        </CardContent>
      </Card>
    </main>
  )
}
