function Problem1() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white max-w-4xl w-full p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">
          Problem 1 – Three Ways to Sum to N
        </h1>

        <pre className="bg-gray-800 text-blue-200 p-4 rounded text-sm overflow-x-auto">
                        {`// Implementation formation using sum_to_n_a


                        var sum_to_n_a = function(n) {
                            let sum = 0;
                            for (let i = 1; i <= n; i++) {
                                sum += i;
                            }
                            return sum;
                        };
                        console.log("sum_to_n_a =", sum_to_n_a(5)); // 15

                        // Implementation formation using sum_to_n_b
                        var sum_to_n_b = function(n) {
                            return (n * (n + 1)) / 2;
                        };
                        console.log("sum_to_n_b =",sum_to_n_b(5)); // 15

                        // Implementation formation using sum_to_n_c
                        var sum_to_n_c = function(n) {
                            return Array.from({ length: n }, (_, i) => i + 1)
                                .reduce((a, b) => a + b, 0);
                        };
                        console.log("sum_to_n_c =",sum_to_n_c(5)); // 15

                        `}
        </pre>
      </div>
    </div>
  );
}

export default Problem1;
