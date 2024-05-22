#!/usr/bin/env python3
"""
BasicCache module
"""

BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """
    Use the BaseCaching attribute to create a simple
    Caching class
    """
    def put(self, key, item):
        """
        Override the super put method, assign to self.cache_data
        the item to the key key.
        if one of the key or item is None, no assinging will process
        """
        if key and item:
            try:
                self.cache_data[key] = item

            except TypeError:
                pass

    def get(self, key):
        """
        Override the super get method, return the value of key in the
        self.cache_data dict, or None if key is None or there is
        no item with key key
        """
        if key:
            return self.cache_data.get(key, None)
