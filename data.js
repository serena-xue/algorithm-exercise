// data.js
window.PROBLEM_LIST = [
    {
        id: "two-sum",
        title: "1. 两数之和 (Two Sum)",
        language: "python",
        descriptionHTML: `
            <p>给定一个整数数组 <code>nums</code> 和一个整数目标值 <code>target</code>，请你在该数组中找出 <strong>和为目标值</strong> <code>target</code> 的那 <strong>两个</strong> 整数，并返回它们的数组下标。</p>
            <p>你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。</p>
            <pre style="background: #2b2b2b; padding: 10px; border-radius: 4px;"><code>输入：nums = [2,7,11,15], target = 9\n输出：[0,1]</code></pre>
        `,
        initialCode: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        pass`,
        expectedCode: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        hash_map = {}\n        for i, num in enumerate(nums):\n            complement = target - num\n            if complement in hash_map:\n                return [hash_map[complement], i]\n            hash_map[num] = i\n        return []`
    },
    {
        id: "palindrome-number",
        title: "9. 回文数 (Palindrome Number)",
        language: "python",
        descriptionHTML: `
            <p>给你一个整数 <code>x</code> ，如果 <code>x</code> 是一个回文整数，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>
            <pre style="background: #2b2b2b; padding: 10px; border-radius: 4px;"><code>输入：x = 121\n输出：true</code></pre>
        `,
        initialCode: `class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        pass`,
        expectedCode: `class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        if x < 0 or (x % 10 == 0 and x != 0):\n            return False\n        reverted_num = 0\n        while x > reverted_num:\n            reverted_num = reverted_num * 10 + x % 10\n            x //= 10\n        return x == reverted_num or x == reverted_num // 10`
    }
];
