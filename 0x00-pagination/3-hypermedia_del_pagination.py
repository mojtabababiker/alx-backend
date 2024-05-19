#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:100]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None,
                        page_size: int = 10) -> Dict:

        ds = self.indexed_dataset()

        assert index is not None and index < len(ds)

        _rows = len(ds) - index
        _page_size = _rows if page_size > _rows else page_size
        data = []
        i = index
        j = index
        while i < (_page_size + index):
            try:
                data.append(ds[j])
                i += 1
                j += 1
            except KeyError:
                j += 1
        result = {
            "index": index,
            "next_index": j,
            "page_size": _page_size,
            "data": data
        }
        return result
