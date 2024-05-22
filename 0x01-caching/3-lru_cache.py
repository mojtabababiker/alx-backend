#!/usr/bin/env python3
"""
LRUCache module
"""

BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """
    Implement LRU (least recently used) caching algorithim
    wich will remove the least used key from the cache
    """
    def __init__(self):
        """
        Create the lifo stack
        """
        self.lru_stack = []
        super().__init__()

    def put(self, key, item):
        """
        Override the super put method, assign to self.cache_data
        the item to the key key.
        if one of the key or item is None, no assinging will process
        """
        if key in self.cache_data and item:
            # just update the key value
            self.cache_data[key] = item
            return

        # if a new key to be added
        if key and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # remove the first cached
                pop = self.lru_stack.pop(0)
                del self.cache_data[pop]
                print(f"DISCARD: {pop}")

            try:
                self.cache_data[key] = item
                self.lru_stack.append(key)

            except TypeError:
                pass

    def get(self, key):
        """
        Override the super get method, return the value of key in the
        self.cache_data dict, or None if key is None or there is
        no item with key key
        """
        if key and key in self.cache_data:
            # rearrange the lru stack moving the key to the bottom
            key_index = self.lru_stack.index(key)
            self.lru_stack.pop(key_index)
            self.lru_stack.append(key)
            return self.cache_data.get(key, None)
