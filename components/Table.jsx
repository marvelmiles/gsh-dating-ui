import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Typography from "./Typography";
import { cn } from "@/lib/utils";

const Table = ({
  heads,
  rows,
  hrClassName = "",
  thClassName = "",
  rowClassName = "",
  tdClassName = "",
  contentClassName = "",
  cellClassName = "",
  cellsClassName = [],
  containerClassName = "",
  ...props
}) => {
  const renderCell = (cell) => {
    return typeof cell === "string" ? (
      <Typography className={cn("", contentClassName)}>{cell}</Typography>
    ) : (
      cell
    );
  };

  return (
    <ShadTable
      {...props}
      containerClassName={cn(
        "max-w-full overflow-auto w-full mx-0",
        containerClassName
      )}
    >
      {heads ? (
        <TableHeader>
          <TableRow
            className={cn(
              "bg-primary hover:bg-primary data-[state=selected]:bg-primary text-white",
              hrClassName,
              rowClassName
            )}
          >
            {heads.map((h, i) => (
              <TableHead
                key={i}
                className={cn(cellClassName, cellsClassName[i], thClassName)}
              >
                {h.content || h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      ) : null}
      {rows ? (
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} className={cn(tdClassName, rowClassName)}>
              {row.map((b = "", i) => (
                <TableCell
                  key={i}
                  className={cn(cellClassName, cellsClassName[i], b.className)}
                >
                  {renderCell(b.content || b)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      ) : null}
    </ShadTable>
  );
};

export default Table;
