"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ArrowUpDownIcon as ArrowsUpDown, SplitSquareVertical } from "lucide-react"

interface AlgorithmStepsProps {
  steps?: any[]
  algorithm?: string
  startRow?: number
  endRow?: number
}

export default function AlgorithmSteps({
  steps = [],
  algorithm = "mergeSort",
  startRow = 0,
  endRow = 0,
}: AlgorithmStepsProps) {
  if (!steps || steps.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Run the algorithm to see step-by-step execution</div>
  }

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium mb-2">
        Showing algorithm steps for rows {startRow} to {endRow}
      </div>

      {steps.map((step, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="bg-muted rounded-md p-2 flex items-center justify-center">
                {algorithm === "mergeSort" ? (
                  <SplitSquareVertical className="h-5 w-5" />
                ) : algorithm === "quickSort" ? (
                  <ArrowsUpDown className="h-5 w-5" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </div>

              <div className="flex-1">
                <div className="font-medium mb-2">
                  Step {index + 1}: {step.action}
                </div>

                <div className="text-sm text-muted-foreground mb-3">
                  {step.action === "split" && "Splitting array into two halves"}
                  {step.action === "merge" && "Merging two sorted arrays"}
                </div>

                <div className="bg-muted/50 p-3 rounded-md overflow-x-auto">
                  <div className="flex flex-wrap gap-1">
                    {step.state &&
                      step.state.map((value: number, i: number) => (
                        <div
                          key={i}
                          className={`px-2 py-1 rounded min-w-[36px] text-center ${
                            step.indices && step.indices.includes(i)
                              ? "bg-orange-200 dark:bg-orange-900"
                              : "bg-background"
                          }`}
                        >
                          {value}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
