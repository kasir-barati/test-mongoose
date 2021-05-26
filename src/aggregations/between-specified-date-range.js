// @ts-check

const now = new Date();
const fourMonthAgo = new Date(now);
fourMonthAgo.setMonth(fourMonthAgo.getMonth() - 4);

/**@param {import('mongoose').Model} ModelName*/
function wrongUsage(ModelName) {
    return ModelName.aggregate([
        {
            $match: {
                $and: [
                    {
                        createdAt: {
                            $lte: now.toISOString(),
                        },
                    },
                    {
                        createdAt: {
                            $gte: fourMonthAgo.toISOString(),
                        },
                    },
                ],
            },
        },
    ]);
}

/**@param {import('mongoose').Model} ModelName*/
function firstWay(ModelName) {
    return ModelName.aggregate([
        {
            $match: {
                $and: [
                    {
                        createdAt: {
                            $lte: new Date(now.toISOString()),
                        },
                    },
                    {
                        createdAt: {
                            $gte: new Date(
                                fourMonthAgo.toISOString(),
                            ),
                        },
                    },
                ],
            },
        },
    ]);
}

/**@param {import('mongoose').Model} ModelName*/
function secondWay(ModelName) {
    return ModelName.aggregate([
        {
            $match: {
                $and: [
                    {
                        createdAt: {
                            $lte: new Date(now.toISOString()),
                            $gte: new Date(
                                fourMonthAgo.toISOString(),
                            ),
                        },
                    },
                ],
            },
        },
    ]);
}

module.exports = {
    aggregations: { wrongUsage, firstWay, secondWay },
};
