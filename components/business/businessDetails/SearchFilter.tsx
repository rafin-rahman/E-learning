"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function SearchFilter({
	list,
	onFilterChange,
}: {
	list: { label: string; value: string }[];
	onFilterChange: (value: string) => void;
}) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	onFilterChange(value);

	// Clear the selected value
	const clearSelection = () => {
		setValue("");
		onFilterChange("");
	};

	return (
		<div className={"flex gap-x-2 justify-end"}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between"
					>
						{value
							? list.find((item) => item.value === value)?.label
							: "Search"}

						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0">
					<Command>
						<CommandInput placeholder="Search items..." />
						<CommandList>
							<CommandEmpty>No item found.</CommandEmpty>
							<CommandGroup>
								{list.map((item) => (
									<CommandItem
										key={item.value}
										value={item.value}
										onSelect={(currentValue) => {
											setValue(
												currentValue === value
													? ""
													: currentValue
											);
											setOpen(false);
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												value === item.value
													? "opacity-100"
													: "opacity-0"
											)}
										/>
										{item.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{value && (
				<Button
					onClick={() => {
						clearSelection();
					}}
				>
					X
				</Button>
			)}
		</div>
	);
}
