#!/usr/bin/env python3
"""
helper function to get the indexes of the pag
"""
from typing import Tuple


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
