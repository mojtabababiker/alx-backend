#!/usr/bin/env python3
"""
helper function to get the indexes of the pag
"""
import csv
import math
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    helper function that return the index range needed to
    get the data according to the page and page_size
    Parameters:
    -----------
    page: int, the numbet of the current page
    page_size: int, the amount of data that a single
               page can hold
    Returns:
    -----------
    indexes: tuple, containing the start and the end of
             data indexes for the current page
    """
    start = (page * page_size) - page_size
    end = page * page_size

    return (start, end)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        by using index_range function, return the data chunck from
        dataset which matches tge needed indexes
        """
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0

        start, end = index_range(page, page_size)
        self.dataset()
        try:
            result = [self.__dataset[i] for i in range(start, end)]
            return result
        except IndexError:
            pass
        return []

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """
        get the current page data, beside extra hypermedia info
        """
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0

        start, end = index_range(page, page_size)
        data = self.get_page(page, page_size)
        ds = self.__dataset
        total_pages = len(ds) // page_size

        result = {}
        result['page_size'] = page_size if end < len(ds) else 0
        result['page'] = page
        result['data'] = data
        result['next_page'] = page + 1 if page + 1 <= total_pages else None
        result['prev_page'] = page - 1 if page - 1 > 0 else None
        result['total_pages'] = total_pages

        return result
